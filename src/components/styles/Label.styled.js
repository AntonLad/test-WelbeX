import styled from 'styled-components'

export const Label = styled.label`
  position: absolute;
  height: 12px;
  font-family: 'SF UI Display';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0.25px;
  color: #828282;
  background: rgb(255, 255, 255);
  left: 27px;
  padding: 0px 5px;
  top: -5px;
  &:focus {
    color: #0086A8;
  }
`;

export const LabelInfo = styled(Label)`
  top: 55px;
  color: #EB5E55;
`