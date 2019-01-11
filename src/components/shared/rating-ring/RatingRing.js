import React, { Component } from 'react'
import CountUp from 'react-countup'
import CircularProgressbar from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { observer } from 'mobx-react'
import store from '../../../stores/store'
import instagram from '../../instagram/stores/instagram'

const RatingRing = observer(
  class RatingRing extends Component {

    render() {
      const props = this.props
      let rate = Number(store.global_rates.global_rate),
          rating = rate.toString().split('.'),
          int = rating[0],
          frac = rating[1] ? rating[1].substr(0,3) : '0',
          frac_num = frac.split(''),
          frac_one = frac_num[0],
          frac_final = frac_num.shift(),
          rating_number = {
            int: Number(int),
            frac_one: Number(frac_one),
            frac_num: Number(frac_num.join(''))
          }

      return (
          <div className='rating'>
            <div className='rating__container'>
              <CircularProgressbar
                percentage={props.rates.global_percent}
                initialAnimation={true}
                strokeWidth={1}
                className={props.number_type === 'rating' ? 'progress-ring__circle-chart' : 'app--remove'}
                styles={{
                  path: { stroke: 'rgba(255,255,255,0.4)' }
                }} />
              <div className='rating__text animate__fade-in'>

                {
                  props.number_type === 'rating'
                    ? (
                      <div className='rate-number'>
                        <CountUp end={rating_number.int} duration={2} decimals={0} />
                        <span>.</span>
                        <CountUp end={rating_number.frac_one} duration={2} decimals={0} />
                        <CountUp className='counter-frac' end={rating_number.frac_num} duration={2} decimals={0} />
                      </div>
                    ) : (
                      <div className='rate-number'>
                        <CountUp end={props.rates} duration={2} decimals={2} />%
                      </div>
                    )
                }
              </div>
            </div>

            <div className={props.number_type === 'rating' ? 'rating__bottom-group' : 'app--remove'}>
              <p>
                <i className='fab fa-instagram' />
                &nbsp; {instagram.user_stats.engagement_avg}%
              </p>
            </div>
          </div>

      )
    }
  }
)

export default RatingRing
