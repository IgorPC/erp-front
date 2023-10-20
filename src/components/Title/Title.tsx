import * as React from 'react';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import TitleProps from './TitleProps';

const Root = styled('div')(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  '& > :not(style) ~ :not(style)': {
    marginTop: theme.spacing(2),
  },
}));

const Title: React.FC<TitleProps> = (props: any) => {
  return (
    <Root>
        <Divider style={{fontSize: '30px', fontWeight: 'bold'}}> { props.name } </Divider>
    </Root>
  );
}

export default Title;