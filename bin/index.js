#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Define the boilerplate structure
const structure = {
    'src': {
        'app.js': '',
        'server.js': '',
        'api': {
            'auth': {
                'auth.controller.js': '',
                'auth.service.js': '',
                'auth.schema.js': ''
            }
        },
        'models': {},
        'middlewares': {
            'auth.js': ''
        },
    },
    'config': {
        'config.js': '',
        '.env.local': ''
    },
    'public': {},
    '.gitignore': 'node_modules\n.env',
    'package.json': '{}',
};

// Function to create files and directories
function createStructure(base, structure) {
    for (const key in structure) {
        const newPath = path.join(base, key);
        if (typeof structure[key] === 'string') {
            fs.writeFileSync(newPath, structure[key]);
        } else {
            fs.mkdirSync(newPath, { recursive: true });
            createStructure(newPath, structure[key]);
        }
    }
}

// Main function to handle CLI commands
function main() {
    const command = process.argv[2];
    const projectName = process.argv[3] || 'my-node-app';

    if (command === 'generate') {
        const projectPath = path.join(process.cwd(), projectName);
        if (fs.existsSync(projectPath)) {
            console.error(`Directory ${projectName} already exists.`);
            process.exit(1);
        } else {
            fs.mkdirSync(projectPath);
            createStructure(projectPath, structure);
            console.log(`Project ${projectName} created successfully.`);
        }
    } else {
        console.log('Usage: node-template generate <project-name>');
        process.exit(1);
    }
}

main();