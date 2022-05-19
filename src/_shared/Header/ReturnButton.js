import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
  cursor: pointer;
  align-self: center;
`

export const ReturnButton = ({ onClick }) => {
  return (
    <Wrapper onClick={onClick}>
      <svg
        width='20'
        height='20'
        viewBox='0 0 25 25'
        x='0px'
        y='0px'
        xmlns='http://www.w3.org/2000/svg'
        preserveAspectRatio='xMidYMid meet'
      >
        <g
          color='white'
          fill='currentcolor'
          transform='translate(-22.000000,45.000000) scale(0.100000,-0.100000)'
        >
          <title>Layer 1</title>
          <line
            strokeLinecap='undefined'
            strokeLinejoin='undefined'
            id='svg_3'
            y2='213.06158'
            x2='353.99447'
            y1='298.07179'
            x1='228.97946'
            strokeWidth='20'
            stroke='white'
            fill='none'
          />
          <line
            strokeLinecap='undefined'
            strokeLinejoin='undefined'
            id='svg_5'
            y2='211.06134'
            x2='354.99459'
            y1='296.07155'
            x1='229.97958'
            strokeWidth='20'
            stroke='white'
            fill='none'
          />
          <line
            transform='rotate(70 291.487 343.577)'
            strokeLinecap='undefined'
            strokeLinejoin='undefined'
            id='svg_6'
            y2='301.07215'
            x2='353.99447'
            y1='386.08235'
            x1='228.97946'
            strokeWidth='20'
            stroke='white'
            fill='none'
          />
          <ellipse
            ry='3.00036'
            rx='10.50126'
            id='svg_9'
            cy='298.07179'
            cx='239.48072'
            strokeWidth='20'
            stroke='white'
            fill='none'
          />
        </g>
      </svg>
    </Wrapper>
  )
}

ReturnButton.propTypes = {
  onClick: PropTypes.func,
}
