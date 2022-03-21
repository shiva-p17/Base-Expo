declare module '*.png' {
  const img: ImageSourcePropType;
  export default img;
}

declare module '*.jpg' {
  const img: ImageSourcePropType;
  export default img;
}

declare module '*.jpeg' {
  const img: ImageSourcePropType;
  export default img;
}

declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
