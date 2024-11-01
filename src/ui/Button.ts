import { Core } from "../core/Core";

interface ButtonProps {
    className?: string;
    width?: number;
    height?: number;
    icon?: string;
    iconPosition?: 'left' | 'right';
    label: string;
    // Event handlers
    onClick?: () => void;
    onDoubleClick?: () => void;
    onPress?: () => void;
    onMouseDown?: () => void;
    onMouseUp?: () => void;
    onHoverStart?: () => void;
    onHoverEnd?: () => void;
    onLeave?: () => void;
    onMultiplePress?: () => void;
}

/**
 * The `Button` class creates a customizable button component that can display
 * text, an icon, and handle various user events.
 */
export class Button {
    private props: ButtonProps;
    public core: Core;

    /**
     * Initializes the `Button` with properties and renders it immediately.
     * @param props - The properties for the button, including styles, label, and event handlers.
     */
    constructor(props: ButtonProps) {
        this.props = props;
        this.core = new Core(document.createElement("button"));
        this.render(); // Render immediately on initialization
    }

    /**
     * Renders the button by applying classes, styles, and content.
     * Also attaches all specified event handlers.
     * @returns The button's HTML element.
     */
    render(): HTMLElement {
        // Apply CSS classes and base styles
        if (this.props.className) {
            this.core.addClass(this.props.className);
        }
        this.core.css({
            width: `${this.props.width ?? 100}px`,
            height: `${this.props.height ?? 40}px`
        });

        // Render label and icon content
        this.renderContent();

        // Attach events as per the properties
        this.attachEvents();
        return this.core.html();
    }

    /**
     * Sets up the button's content, including text label and optional icon.
     * If an icon is provided, it places it in the correct position (left or right).
     */
    private renderContent() {
        this.core.html().textContent = ''; // Clear any existing content

        if (this.props.icon) {
            const icon = document.createElement('img');
            icon.src = this.props.icon;
            icon.alt = 'icon';
            if (this.props.iconPosition === 'right') {
                this.core.appendText(this.props.label).append(icon);
            } else {
                this.core.append(icon).appendText(this.props.label);
            }
        } else {
            this.core.appendText(this.props.label);
        }
    }

    /**
     * Attaches all event handlers specified in `ButtonProps` to the button element.
     * Maps each event handler to its corresponding DOM event.
     */
    private attachEvents() {
        const eventMapping: { [key: string]: (() => void) | undefined } = {
            click: this.props.onClick,
            dblclick: this.props.onDoubleClick,
            mousedown: this.props.onPress || this.props.onMouseDown,
            mouseup: this.props.onMouseUp,
            mouseenter: this.props.onHoverStart,
            mouseleave: this.props.onHoverEnd || this.props.onLeave,
        };

        for (const [event, handler] of Object.entries(eventMapping)) {
            if (handler) {
                this.core.on(event, handler);
            }
        }
    }

    /**
     * Refreshes the button with new properties and re-renders it.
     * Allows updating the button's properties without recreating the instance.
     * @param newProps - Partial set of new properties to update on the button.
     * @returns The current `Button` instance for chaining.
     */
    refresh(newProps: Partial<ButtonProps>): this {
        this.props = { ...this.props, ...newProps };
        this.render(); // Re-render with updated properties
        return this;
    }
}
