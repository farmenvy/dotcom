import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip as BootstrapTooltip } from 'react-bootstrap';

const Tooltip = props => (
  <BootstrapTooltip id={props.id}>{props.tooltip}</BootstrapTooltip>
);

Tooltip.propTypes = ({
  id: PropTypes.number.isRequired,
  tooltip: PropTypes.string.isRequired,
});

export default Tooltip;
