import { createNewStream, openStreamToString } from "@/utils/openAIUtils";
import { useEffect, useState } from "react";

interface Props {
  requestMessage: string;
}
const useOpenAI = ({ requestMessage }: Props) => {
  const [message, setMessage] = useState<string>("");

  const appendMessage = (message: string) =>
    setMessage((prev) => prev + message);

  useEffect(() => {
    createNewStream({ message: requestMessage }).then((stream) => {
      openStreamToString({ stream, appendToTarget: appendMessage });
    });
  }, [requestMessage]);

  useEffect(() => console.log(message), [message]); // FOR TEST

  return {
    message,
  };
};

export default useOpenAI;
