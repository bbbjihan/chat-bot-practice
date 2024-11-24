import { isUndefined } from "@/utils/typeNarrowFunctions";
import { ChangeEventHandler, useEffect, useState } from "react";

interface Props {
  initMessage: string;
  isStreaming: boolean;
  appendNewMessageBranch: (nodeId: string, message: string) => void;
  id?: string;
}
const useUserMessage = ({
  initMessage,
  isStreaming,
  appendNewMessageBranch,
  id,
}: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editMessageInput, setEditMessageInput] = useState<string>(initMessage);

  const toggleIsEditing = () => setIsEditing((prev) => !prev);

  const handleEditMessageInput: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (event) => setEditMessageInput(event.target.value);

  const resetEditMessageInput = () => setEditMessageInput(initMessage);
  const resetIsEditing = () => setIsEditing(false);
  useEffect(resetEditMessageInput, [isEditing, initMessage]);
  useEffect(resetIsEditing, [isStreaming]);

  const submitEdit = () => {
    if (isUndefined(id)) return;

    appendNewMessageBranch(id, editMessageInput);
    setIsEditing(false);
  };

  return {
    isEditing,
    toggleIsEditing,
    editMessageInput,
    handleEditMessageInput,
    submitEdit,
  };
};

export default useUserMessage;
