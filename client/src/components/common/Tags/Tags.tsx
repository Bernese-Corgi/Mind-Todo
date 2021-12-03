import React from 'react';
import { Link } from 'react-router-dom';
import theme from 'styles/theme';
import { Icon } from '..';
import { StyledTagsUl, StyledTagLi, StyledCancelButton } from './Tags.styled';

interface TagsProps {
  tags: string[] | undefined;
  isWrite: boolean;
  onClickRemoveBtn?: any;
}

interface TagItemprops {
  tag: string;
  isWrite: boolean;
  index: number;
  onClickRemoveBtn?: any;
}

const TagItem = React.memo(
  ({ tag, isWrite, index, onClickRemoveBtn }: TagItemprops) => {
    return (
      <StyledTagLi>
        <div className="textBox">
          {isWrite ? (
            `# ${tag}`
          ) : (
            <Link to={`/?tag=${tag}`} children={`# ${tag}`} />
          )}
        </div>
        {isWrite && (
          <StyledCancelButton
            type="button"
            onClick={e => onClickRemoveBtn(e, index)}>
            <Icon
              id="removeTagBtn"
              title="태그 지우기"
              shape="cancel"
              color={theme.colors.gray.dark}
              // onClick={key => handle÷ClickCancel(key)}
            />
          </StyledCancelButton>
        )}
      </StyledTagLi>
    );
  }
);

const Tags = React.memo(({ tags, isWrite, onClickRemoveBtn }: TagsProps) => {
  console.log(tags);
  return (
    <StyledTagsUl>
      {tags?.map((tag, i) => (
        <TagItem
          key={`${i}-${tag}`}
          index={i}
          tag={tag}
          isWrite={isWrite}
          onClickRemoveBtn={onClickRemoveBtn}
        />
      ))}
    </StyledTagsUl>
  );
});

export default Tags;