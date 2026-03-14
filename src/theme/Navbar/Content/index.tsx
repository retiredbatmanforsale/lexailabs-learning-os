import React from 'react';
import Content from '@theme-original/Navbar/Content';
import type ContentType from '@theme/Navbar/Content';
import type { WrapperProps } from '@docusaurus/types';
import NavbarAuthButtons from '../../../components/NavbarAuthButtons';

type Props = WrapperProps<typeof ContentType>;

export default function ContentWrapper(props: Props): React.JSX.Element {
  return (
    <>
      <Content {...props} />
      <NavbarAuthButtons />
    </>
  );
}
