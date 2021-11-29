import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import {
  MdH1,
  MdH2,
  MdH3,
  MdH4,
  MdH5,
  MdH6,
  MdViewerWrapper,
} from './MdViewer.styled';

const MdViewer = ({ body }) => {
  const markdown = `
# This is a H1
## This is a H2
### This is a H3
#### This is a H4
##### This is a H5
###### This is a H6

===

---

> This is a first blockqute.
>	> This is a second blockqute.
>	>	> This is a third blockqute.

1. 첫번째
2. 두번째
3. 세번째

* 빨강
  * 녹색
    * 파랑

+ 빨강
  + 녹색
    + 파랑

- 빨강
  - 녹색
    - 파랑

* 1단계
  - 2단계
    + 3단계
      + 4단계


\`\`\`java
public class BootSpringBootApplication {
  public static void main(String[] args) {
    System.out.println("Hello, Honeymon");
  }
}
\`\`\`

\`<hr />\`

* * *

***

*****

- - -

---------------------------------------

[link keyword][id]

[id]: URL "Optional Title here"

// code
Link: [Google][googlelink]

[googlelink]: https://google.com "Go google"

사용문법: [Title](link)
적용예: [Google](https://google.com, "google link")

일반적인 URL 혹은 이메일주소인 경우 적절한 형식으로 링크를 형성한다.

* 외부링크: <http://example.com/>
* 이메일링크: <address@example.com>

*single asterisks*
_single underscores_
**double asterisks**
__double underscores__
~~cancelline~~

![Alt text](/path/to/img.jpg)
![Alt text](/path/to/img.jpg "Optional title")

사이즈 조절 기능은 없기 때문에 <img width="" height=""></img>를 이용한다.

* 줄 바꿈을 하기 위해서는 문장 마지막에서 3칸이상을 띄어쓰기해야 한다. 
이렇게

* 줄 바꿈을 하기 위해서는 문장 마지막에서 3칸이상을 띄어쓰기해야 한다.   띄어쓰기
이렇게

|1|2|3|
|---|---|---|
|4|5|6|
|7|8|9|
    `;

  return (
    <MdViewerWrapper>
      <ReactMarkdown
        className="mdViewer"
        components={{
          h1: ({ children }) => <MdH1 children={children} />,
          h2: ({ children }) => <MdH2 children={children} />,
          h3: ({ children }) => <MdH3 children={children} />,
          h4: ({ children }) => <MdH4 children={children} />,
          h5: ({ children }) => <MdH5 children={children} />,
          h6: ({ children }) => <MdH6 children={children} />,

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
        {markdown}
      </ReactMarkdown>
    </MdViewerWrapper>
  );
};

export default MdViewer;
