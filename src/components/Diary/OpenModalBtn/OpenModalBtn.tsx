import AddIcon from '@mui/icons-material/Add';
import { Button, Icon } from '@mui/material';
import React from 'react';

interface IProps {
  clickAction?: Function;
  type?: 'button' | 'submit';
}

const PlusCircleBtn: React.FC<IProps> = ({ clickAction, type }) => {
  return (
    <Button
      type={type ? type : 'button'}
      onClick={() => clickAction && clickAction()}
      sx={{
        minWidth: '0px',
        width: '48px',
        height: '48px',
        lineHeight: '0px',
        borderRadius: '100%',
        padding: 0,
      }}
    >
      <Icon>
        <AddIcon />
      </Icon>
    </Button>
  );
};

export default PlusCircleBtn;
