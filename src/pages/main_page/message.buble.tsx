import { FC } from "react";

interface MessageBubbleProps {
  isMine: boolean;
  text: string;
}

const MessageBubble: FC<MessageBubbleProps> = (props) => {
  return (
    <>
      <div>
        <div>
            {props.text}
        </div>
      </div>
    </>
  );
}
export default MessageBubble;