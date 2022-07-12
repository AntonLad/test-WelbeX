import styled from 'styled-components'


export const ButtonAdd = styled.div`
  width: 221px;
  height: 21px;
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: #353238;
  cursor: pointer;
  margin-bottom: 25px;
`;

export const ButtonSend = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 18px 25px;
  gap: 10px;
  width: 380px;
  height: 50px;
  background: #E3E3E3;
  border-radius: 8px;
  border: none;
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 100%;
  text-align: center;
  color: #828282;
`
export const ButtonSendActive = styled(ButtonSend)`
  background: #00657E;
  color: #FFFFFF;
  cursor: pointer;
  &:hover {
    background: #007693
  }
`