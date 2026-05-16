/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}" ,'./src/components/**/*.jsx'],
  
safelist: ['animate-[fade-in_1s_slide-out-left]', 'animate-[fade-in-down_1s_ease-in-out]'],
  theme: {
    extend: {
animation: {
      blink: "blink 1s infinite ease-in-out",
      'infinite-scroll': 'infinite-scroll 25s linear infinite', "ping-slow": "ping 3s cubic-bezier(0,0,0.2,1) infinite",

    },
    // Combine all custom keyframes here
    keyframes: {
      'infinite-scroll': {
        from: { transform: 'translateX(0)' },
        to: { transform: 'translateX(-100%)' },
      },
      blink: {
        "0%, 100%": { opacity: "0.3" },
        "50%": { opacity: "1" },
      },
    },
         fontFamily: {
      serif: ['Playfair Display', 'serif'],
    },
      borderStyle: {
        'dashed': 'dashed',
      },
      screens: {
        'small':'400px',
        'custom': '1098px',
        'default': '1400px',
        'xl' : '1800px'
      },
      fontSize: {
        xxs: '12px',
        xxxs: '10px'
      },
      colors: {
        button:{
          start:'#05ABB6',
          end:'#6BDBE2',
        },
        transparent:'rgba(255, 255, 255, 0.3)',
        highlight:'#388087',
        login:'#6FB3B8',
        cta:'#00BBAA',
        yellow:'#F8CA55',
        sun:'#FF9900',
        shade:'#F8F8FF',
        yoi:'#B4F1CF',
        ctao:'#FF6161',
        read:'#116466',
        red:'#F85454',
        birthdaybg:'#FFECF0',
        purple:'#B8A7FB',
        viola:'#583EBC',
        pink:'#EE266E',
        active:'#3AB4BC',
        sky:'#6FA8FF',
        orange:'#EE266E',
        shortcut:'#6FA8FF',
        story:{
          start:'#EE266E',
          end:'#5CBE8F',
        },
        page:'#BFC138',
        span:{
          start:'#3AB4BC',
          end:'#5CBE8F',
        },
      },
      fontSize: {
        'time': '10px',
      },
    },
    experimental: {
      applyComplexClasses: true,
      layers: ['utilities'],
    },
  },
  plugins: [],
}

