import { useState, useEffect } from "react";
import { useQuery, gql, useMutation, useSubscription } from '@apollo/client';

const CHATROOM_QUERY = gql`
    query {
        chatroom {
            messages {
                timestamp,
                contents,
                from
            }
        }
    }
`;

const ADD_MESSAGE_MUTATION = gql`
    mutation sendMessage($timestamp: String!, $contents: String!, $from: String!) {
        sendMessage(timestamp: $timestamp, contents: $contents, from: $from) {
            timestamp,
            contents,
            from
        }
    }
`;

const NEW_MESSAGE_SUBSCRIPTION = gql`
    subscription {
        newMessage {
            timestamp,
            contents,
            from
        }
    }
`;

const useMessaging = (name) => {
    const [messages, setMessages] = useState(undefined);
    const { data: chatroomData } = useQuery(CHATROOM_QUERY);
    const [addMessageMutation] = useMutation(ADD_MESSAGE_MUTATION);
    const { data: newMessageData } = useSubscription(NEW_MESSAGE_SUBSCRIPTION);

    const addMessage = (contents) => {
        const timestamp = new Date().toJSON();

        addMessageMutation({
            variables: {
                timestamp,
                contents,
                from: name
            }
        });
    }

    useEffect(() => {
        if(!chatroomData) {
            return;
        }

        const { chatroom } = chatroomData;
        setMessages(chatroom.messages);
    }, [chatroomData])

    useEffect(() => {
        if(!newMessageData) {
            return;
        }

        const { newMessage } = newMessageData;
        setMessages(m => [...m, newMessage]);
    }, [newMessageData]);

    return [messages, addMessage];
}

export default useMessaging;