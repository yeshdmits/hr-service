#!/bin/bash

dry_run=false

dry_run_echo() {
    if [ "$dry_run" = true ]; then
        echo -e "\033[1;33m🔍 $1\033[0m"  # Yellow color for dry run messages
    else
        eval "$1"
    fi
}

clean() {
    echo "🧹 Cleaning up build directory..."

    if [ "$dry_run" = true ]; then
        dry_run_echo "cd site && npm run clean"
        dry_run_echo "cd ../api && npm run clean"
    else
        cd site && npm run clean
        cd ../api && npm run clean
    fi

    echo "✅ Clean complete."
}

build() {
    echo "🔨 Building the frontend part..."

    if [ "$dry_run" = true ]; then
        dry_run_echo "cd site && npm i && npm run generate && npm run build && npm run copyfiles"
    else
        cd site
        npm i && npm run generate && npm run build && npm run copyfiles
    fi

    echo "🎉 Successfully built frontend :)"
    
    echo "🔧 Building the backend part..."

    if [ "$dry_run" = true ]; then
        dry_run_echo "cd ../api && npm i && npm run generate && npm run build && npm run copyfiles"
    else
        cd ../api
        npm i && npm run generate && npm run build && npm run copyfiles
    fi
}

api() {
    echo "🚀 Running backend setup..."

    if [ "$dry_run" = true ]; then
        dry_run_echo "cd api && npm run dev"
    else
        cd api && npm run dev
    fi
}

site() {
    echo "🌐 Running frontend setup..."

    if [ "$dry_run" = true ]; then
        dry_run_echo "cd site && npm run dev"
    else
        cd site && npm run dev
    fi
}

mongo() {
    echo "🐳 Starting MongoDB Docker container..."

    if [ "$dry_run" = true ]; then
        dry_run_echo "docker run -d --name mongodb -p 27017:27017 mongo:latest"
    else
        docker run -d --name mongodb -p 27017:27017 mongo:latest
    fi

    echo "🌟 MongoDB is running on port 27017."
}

# Help function to display script usage
help() {
    echo -e "\033[1;32mUsage: ./ci.sh [options] [commands]\033[0m"  # Green color for usage
    echo
    echo -e "\033[1;33mOptions:\033[0m"
    echo -e "  \033[1;33m--dry-run\033[0m    Run without making changes"
    echo
    echo -e "\033[1;33mCommands:\033[0m"
    echo -e "  \033[1;35mclean\033[0m           Clean build directories"
    echo -e "  \033[1;35mbuild\033[0m           Build frontend and backend"
    echo -e "  \033[1;35mapi\033[0m             Set up and run the backend"
    echo -e "  \033[1;35msite\033[0m            Set up and run the frontend"
    echo -e "  \033[1;35mmongo\033[0m           Start MongoDB Docker container"
    echo
}

# Parse command-line arguments
while [[ "$#" -gt 0 ]]; do
    case $1 in
        --dry-run) dry_run=true ;;
        *) command=$1 ;;
    esac
    shift
done

# Execute the specified command
case $command in
    clean) clean ;;
    build) build ;;
    api) api ;;
    site) site ;;
    mongo) mongo ;;
    *) help ;;
esac
