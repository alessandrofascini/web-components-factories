export function EventsDecorator(
  eventType: string,
  defaultEventInit?: EventInit
): {
  Type: string;
} {
  return class extends Event {
    static get Type(): string {
      return eventType;
    }

    constructor(options: EventInit | undefined = defaultEventInit) {
      super(eventType, options);
    }
  };
}
