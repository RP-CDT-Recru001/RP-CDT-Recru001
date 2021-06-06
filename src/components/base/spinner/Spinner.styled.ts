import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

const StyledICircularProgress = styled(CircularProgress)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.theme.size} !important; //grr dirty Material styles override
  color: ${(props) => props.theme.fontColor} !important; //grr dirty Material styles override
`;

//background-color: ${(props) => props.theme.color};

const baseSpinnerComponents = {
  StyledICircularProgress
};

export default baseSpinnerComponents;
