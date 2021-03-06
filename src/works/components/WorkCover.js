import React from 'react';
import { useSpring } from 'react-spring';

import { CardMedia, Overlay, Cover, Tag } from './styles';

function WorkCover({ name, cover, size, statusTag, status }) {
  const tagProps = useSpring({
    to: { opacity: 1, transform: 'translate3d(0,0,0)' },
    from: {
      opacity: 0.2,
      transform: 'translate3d(10px,0,0)'
    }
  });
  const coverProps = useSpring({
    to: { opacity: 1, transform: 'translate3d(0,0,0)' },
    from: { opacity: 0.8, transform: 'translate3d(0,2px,0)' }
  });
  return (
    <CardMedia size={size}>
      <Cover style={coverProps} size={size} thumb={cover}>
        {size === 'small' && (
          <Overlay>
            <span className="title">{name}</span>
          </Overlay>
        )}
      </Cover>
      {size !== 'small' && statusTag && (
        <Tag
          style={{
            ...tagProps,
            backgroundColor: statusTag ? statusTag.background : '',
            color: statusTag ? statusTag.color : ''
          }}
        >
          {status}
        </Tag>
      )}
    </CardMedia>
  );
}
export default WorkCover;
