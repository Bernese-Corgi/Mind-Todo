import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const MdViewer = ({ body }) => {
  const markdown = `
  ## Heading
  
  # h1
  
  [link](http://google.com)
  
  \`\`\`json
    {
      "name": "body"
    }
  \`\`\`
  
  \`\`\`js
    const variable1 = 1;
    const variable2 = 'hihi';
  \`\`\`
  
  dd
    `;

  return (
    <div>
      <ReactMarkdown
        components={{
          // p: ({ node, children }) => {
          //   // ...
          // },
          code: ({ className, children }) => {
            // Removing "language-" because React-Markdown already added "language-"
            const language = className?.replace('language-', '');
            return (
              <SyntaxHighlighter
                style={materialDark}
                language={language}
                children={children[0]}
              />
            );
          },
        }}
        remarkPlugins={[remarkGfm]}>
        {body}
      </ReactMarkdown>
    </div>
  );
};

export default MdViewer;
