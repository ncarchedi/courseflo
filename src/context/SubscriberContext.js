import { createContext } from "react";

const SubscriberContext = createContext();

export const SubscriberProvider = SubscriberContext.Provider;

export default SubscriberContext;
