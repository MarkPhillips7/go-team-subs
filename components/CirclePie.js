import React, {
    Component
} from 'react';
import _ from 'lodash';
import { Svg } from 'expo';
const {
    Circle,
    Path,
    Text
} = Svg;

const circleBorderWidth = 0.08;
//{`${this.props.piePieces[0].startValue*2*Math.PI*this.props.radius/2}, ${0.5*2*Math.PI*this.props.radius/2}`}
// this.props.piePieces && this.props.piePieces.map((piePiece, index) => (
//   <Circle
//     key={index}
//     origin={`{this.props.radius}, {this.props.radius}`}
//     cx={this.props.radius}
//     cy={this.props.radius}
//     r={this.props.radius / 2}
//     stroke={piePiece.color}
//     strokeWidth={this.props.radius}
//     fill="none"
//     strokeDasharray={`${piePiece.endValue*2*Math.PI*this.props.radius}, ${2*Math.PI*this.props.radius}`}
//     strokeDashoffset={`${piePiece.startValue*2*Math.PI*this.props.radius}`}
//   />
// ))
// style={{transform: "rotate(-0.25turn)"}}

// <Svg
//   key={index}
//   viewBox="-1 -1 2 2"
// >
//   <Path
//     d={pathData}
//     fill={piePiece.color}
//   />
// </Svg>

  // style={{transform: [
  //   {rotate: "-90deg"}
  // ]}}
export default class CirclePie extends Component {
  static title = 'Draw a Pie shape with circle';
  render() {
    const getCoordinatesPieSlice = (percent) => {
      const quarterTurnOffset = -1/4*2 * Math.PI;
      const x = Math.cos(quarterTurnOffset + 2 * Math.PI * percent) * (1 - circleBorderWidth);
      const y = Math.sin(quarterTurnOffset + 2 * Math.PI * percent) * (1 - circleBorderWidth);
      return [x, y];
    };

    return (
      <Svg
        height={this.props.radius*2}
        width={this.props.radius*2}
        style={this.props.style}
        viewBox="-1 -1 2 2"
      >
        <Circle
            r={1 - (circleBorderWidth / 2)}
            fill="#fff"
            stroke={this.props.positionColor}
            strokeWidth={circleBorderWidth}
        />
        {
          this.props.piePieces &&
          _.chain(this.props.piePieces)
          .filter((piePiece) => typeof piePiece.startValue === 'number')
          .map((piePiece, index) => {
            const [startX, startY] = getCoordinatesPieSlice(piePiece.startValue);
            const [endX, endY] = getCoordinatesPieSlice(piePiece.endValue);

            // if the slice is more than 50%, take the large arc (the long way around)
            const largeArcFlag = piePiece.endValue - piePiece.startValue > .5 ? 1 : 0;

          	// create an array and join it just for code readability
            const pathData = [
              `M ${startX} ${startY}`, // Move
              `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
              `L 0 0`, // Line
            ].join(' ');
            // console.log(`pathData: ${pathData}, color: ${piePiece.color}`)

            return (
              <Path
                key={index}
                d={pathData}
                fill={piePiece.color}
                stroke={piePiece.color}
                strokeWidth={circleBorderWidth / 3}
              />
            );
          })
          .value()
        }
      </Svg>
    );
  }
}
