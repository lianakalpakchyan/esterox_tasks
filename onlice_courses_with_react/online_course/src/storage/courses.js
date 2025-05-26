const courses = [
    {
        value: 'python',
        option: '🐍 Python for Beginners'
    },
    {
        value: 'js',
        option: '⚡ JavaScript Essentials'
    },
    {
        value: 'htmlcss',
        option: '🎨 HTML & CSS Basics'
    },
    {
        value: 'data',
        option: '📊 Data Analysis with Python'
    }
]

const courseMap = Object.fromEntries(courses.map(c => [c.value, c.option]));

export { courses, courseMap }
