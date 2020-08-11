const presets = [
    ['@babel/env',
        {
            targets: {
                edge: '17',
                ie: '11',
                firefox: '50',
                chrome: '64',
                safari: '11.1'
            },

            useBuiltIns: "entry"
        }
    ],
    {
        "plugins": [
          ["transform-class-properties", { "spec": true }]
        ]
      }
    
];

module.exports = { presets };