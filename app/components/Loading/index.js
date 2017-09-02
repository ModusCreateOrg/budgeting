// @flow
import * as React from 'react';
import s from './styles.scss';

const Loading = () => (
  <div className={s.timelineItem}>
    <ul className={s.animatedBackground}>
      <li className={s.headerTop} />
      <li className={s.headerRight} />
      <li className={s.headerBottom} />
      <li className={s.subheaderRight} />
      <li className={s.subheaderBottom} />
      <li className={s.contentTop} />
      <li className={s.contentFirstEnd} />
      <li className={s.contentSecondLine} />
      <li className={s.contentSecondEnd} />
      <li className={s.contentThirdLine} />
      <li className={s.contentThirdEnd} />
    </ul>
  </div>
);

export default Loading;
