import React from 'react';
import './TodoInput.css';
import { Input } from 'antd';

function submit (props, e) {
    if (e.key === 'Enter') {
        if (e.target.value.trim() !== '') {
            props.onSubmit(e)
        }
    }
}
function changeTitle (props, e) {
    props.onChange(e)
  }

  // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
   export default function (props) {
    return <Input type="text" value={props.content}
      className="TodoInput"
      onChange={changeTitle.bind(null, props)}
      onKeyPress={submit.bind(null, props)}/>
    }