import React from 'react'
import PropTypes from 'prop-types'
import Ink from 'react-ink'
import classnames from 'classnames'
import { onlyUpdateForPropTypes } from 'recompose'
import Icon from '../icon'
import styles from '../../src/button/button.styles.scss'

const Button = ({
  onClick,
  className,
  style,
  children,
  large,
  primary,
  secondary,
  flat,
  disabled,
  ink,
  title,
  href,
  targetBlank,
  iconLeft,
  iconRight,
  type,
}) => {
  const classes = classnames(
    styles.button,
    className,
    {
      [styles.primary]: primary && !flat,
      [styles.secondary]: secondary && !flat,
      [styles.disabled]: disabled,
      [styles.large]: large,
      [styles.flat]: flat,
      [styles.primaryFlat]: flat && primary,
      [styles.secondaryFlat]: flat && secondary,
      [styles.withText]: children,
    },
  )

  /* define props */
  const linkProps = { href, target: targetBlank ? '_blank' : '' }
  const commonProps = {
    className: classes,
    style,
    disabled,
    title,
    onClick,
  }
  const iconProps = flat ? { primary, secondary, disabled } : {}

  /* content of component (Button or Link) */
  const childrenComponent = []
  if (ink && !disabled && !flat) childrenComponent.push(<Ink key="ink" />)
  if (iconLeft) {
    childrenComponent.push(
      <Icon key="l" className={styles.iconLeft} {...iconProps} >
        {iconLeft}
      </Icon>,
    )
  }
  if (children) childrenComponent.push(children)
  if (iconRight) {
    childrenComponent.push(
      <Icon key="r" className={styles.iconRight} {...iconProps} >
        {iconRight}
      </Icon>,
    )
  }

  return (
    !href ?
      <button {...commonProps} type={type}>{childrenComponent}</button> :
      <a {...linkProps} {...commonProps}>{childrenComponent}</a>
  )
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  large: PropTypes.bool,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  disabled: PropTypes.bool,
  flat: PropTypes.bool,
  ink: PropTypes.bool,
  children: PropTypes.node,
  title: PropTypes.string,
  href: PropTypes.string,
  targetBlank: PropTypes.bool,
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string,
  type: PropTypes.string,
}

Button.defaultProps = {
  className: '',
  style: {},
  large: false,
  primary: false,
  secondary: false,
  disabled: false,
  flat: false,
  ink: true,
  children: undefined,
  title: '',
  href: undefined,
  targetBlank: false,
  iconLeft: undefined,
  iconRight: undefined,
  type: undefined,
}

export default onlyUpdateForPropTypes(Button)
