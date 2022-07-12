import styled from 'styled-components'

export const Input = styled.input.attrs((props) => ({
  type: props.type,
  placeholder: props.placeholder
}))`
  padding: 0px 10px;
  width: 170px;
  height: 50px;
  background: #FFFFFF;
  border: 2px solid #E3E3E3;
  border-radius: 8px;
  margin-bottom: 25px;
  font-family: 'Open Sans';
  font-size: 14px;

  &:focus {
    outline: none;
    border: 2px solid #0086A8;
  }
`;

export const Select = styled.select`
width: 400px;
height: 50px;
padding: 0px 10px;
background: #FFFFFF;
border: 2px solid #E3E3E3;
border-radius: 8px;
margin-bottom: 25px;
font-family: 'Open Sans';
font-size: 14px;

&:focus {
    outline: none;
    border: 2px solid #0086A8;
  }
`;

export const InputWidth = styled(Input)`
 width: 375px
`;
