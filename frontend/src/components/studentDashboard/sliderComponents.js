import React from 'react';

function Handle({
    handle: { id, value, percent },
    getHandleProps
  }) {
    return (
      <div
        style={{
          left: `${percent}%`,
          position: 'absolute',
          marginLeft: -15,
          marginTop: 32,
          zIndex: 2,
          width: 25,
          height: 25,
          border: 0,
          textAlign: 'center',
          cursor: 'pointer',
          borderRadius: '50%',
          backgroundColor: '#7971ea',
          color: '#343a40',
        }}
        {...getHandleProps(id)}
      >
        <div style={{ fontFamily: 'Roboto', fontSize: 11, marginTop: -20 }}>
          {value}
        </div>
      </div>
    )
}

function Track({ source, target, getTrackProps }) {
    return (
      <div
        style={{
          position: 'absolute',
          height: 10,
          zIndex: 1,
          marginTop: 40,
          backgroundColor: '#7971ea',
          borderRadius: 5,
          cursor: 'pointer',
          left: `${source.percent}%`,
          width: `${target.percent - source.percent}%`,
        }}
        {...getTrackProps() /* this will set up events if you want it to be clickeable (optional) */}
      />
    )
}

function Tick({ tick, count }) {
    return (
      <div>
        <div
          style={{
            position: 'absolute',
            marginTop: 52,
            marginLeft: -0.5,
            width: 1,
            height: 8,
            backgroundColor: 'silver',
            left: `${tick.percent}%`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            marginTop: 60,
            fontSize: 10,
            textAlign: 'center',
            marginLeft: `${-(100 / count) / 2}%`,
            width: `${100 / count}%`,
            left: `${tick.percent}%`,
          }}
        >
          {tick.value}
        </div>
      </div>
    )
}

export { Handle, Track, Tick }