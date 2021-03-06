import { cloneElement } from 'react';

const style = {
  width: '100%',
  maxWidth: 1200,
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: 20,
  paddingRight: 20,
};

export default function ({ children, renderer }) {
  const newElement = cloneElement(renderer, {
    style: Object.assign({}, style, renderer.props.style),
    children,
  });
  
  return newElement;
}
