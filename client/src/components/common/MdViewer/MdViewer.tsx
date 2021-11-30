import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { MdViewerWrapper } from './MdViewer.styled';

const MdViewer = ({ body }) => {
  return (
    <MdViewerWrapper>
      <ReactMarkdown
        className="mdViewer"
        skipHtml={false}
        components={{
          code: ({ className, children }) => {
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
    </MdViewerWrapper>
  );
};

export default MdViewer;
