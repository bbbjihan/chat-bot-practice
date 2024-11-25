import { isNull } from "@/utils/typeNarrowFunctions";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
  content: string;
}

const MessageContent = ({ content }: Props) => {
  return (
    <div
      style={{
        display: "inline",
        maxWidth: "100%",
        overflowX: "auto",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}
    >
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");

            return inline ? (
              <code
                {...props}
                className={className}
                style={{
                  backgroundColor: "#bdbdbd",
                  padding: "2px",
                  paddingLeft: "6px",
                  paddingRight: "6px",
                  borderRadius: "4px",
                }}
              >
                {children}
              </code>
            ) : (
              <SyntaxHighlighter
                style={oneDark}
                language={isNull(match) ? undefined : match[1]}
                showLineNumbers
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MessageContent;
