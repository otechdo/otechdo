interface Config {
    theme?: string;
    resolution?: string;
}

// Desk class with desktop-specific functionality
export class Desk {
    config: Config;
    private eventHandlers: { [key: string]: Function[] } = {};
    private fileSystem: { [fileName: string]: string } = {}; // Simulated in-memory file system

    constructor(config: Config = { theme: "light", resolution: "1280x720" }) {
        this.config = config;
    }

    // Method to handle events by registering callbacks
    handleEvent(eventName: string, callback: Function) {
        if (!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
        }
        this.eventHandlers[eventName].push(callback);
    }

    // Method to trigger events (simulate system events)
    triggerEvent(eventName: string) {
        const handlers = this.eventHandlers[eventName];
        if (handlers) {
            handlers.forEach(handler => handler());
        }
    }

    // Method to create a file with content
    createFile(fileName: string, content: string) {
        this.fileSystem[fileName] = content;
    }

    // Method to read the content of a file
    readFile(fileName: string): string | undefined {
        return this.fileSystem[fileName];
    }

    // Method to delete a file
    deleteFile(fileName: string) {
        delete this.fileSystem[fileName];
    }

    // Method to trigger notifications with an optional callback
    notify(message: string, callback?: () => void) {
        console.log(`Notification: ${message}`);
        if (callback) {
            callback();
        }
    }

    // Simulated method to trigger a notification event
    triggerNotification(message: string) {
        const handlers = this.eventHandlers[message];
        if (handlers) {
            handlers.forEach(handler => handler());
        }
    }
}
