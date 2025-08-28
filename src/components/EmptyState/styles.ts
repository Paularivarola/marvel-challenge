import styled from "styled-components";

export const Wrapper = styled.div`
  text-align: center;
  padding: clamp(24px, 6vw, 48px);
  color: #555;
  display: grid;
  gap: 12px;
  justify-items: center;

  h2 {
    font-weight: 700;
    font-size: clamp(18px, 2.6vw, 22px);
    margin: 0;
  }
  p {
    margin: 0;
    opacity: 0.9;
  }
`;
export const HintList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 4px 0 0;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  kbd {
    background: #f2f2f2;
    border: 1px solid #e5e5e5;
    border-radius: 6px;
    padding: 4px 8px;
    font-family: ui-monospace, monospace;
  }
`;
export const Button = styled.button`
  margin-top: 8px;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: #fff;
  cursor: pointer;
`;
