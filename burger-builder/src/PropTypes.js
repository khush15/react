import PropTypes from "prop-types";
import { order } from 'prop-types';


export const userType = order({
  key: string,
  clicked: func,
  btnType: string,
  className: string
});
