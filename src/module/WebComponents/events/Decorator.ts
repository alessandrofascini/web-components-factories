export type CustomEvent<T = {}> = {
  new (options: EventInit | undefined): Event & T;
  prototype: Event & T;
  Type: string;
};

export function EventsDecorator(
  eventType: string,
  defaultEventInit?: EventInit
): CustomEvent {
  return class extends Event {
    static get Type(): string {
      return eventType;
    }

    constructor(options: EventInit | undefined = defaultEventInit) {
      super(eventType, options);
    }
  };
}

export function ChangedEvent<T>(
  eventType: string,
  defaultEventInit?: EventInit
): {
  new (oldValue: T, newValue: T, options: EventInit | undefined): Event & {
    oldValue: T;
    newValue: T;
  };
  prototype: Event & {
    oldValue: T;
    newValue: T;
  };
  Type: string;
} {
  return class extends EventsDecorator(eventType, defaultEventInit) {
    constructor(
      public oldValue: T,
      public newValue: T,
      options: EventInit | undefined = defaultEventInit
    ) {
      super(options);
    }
  };
}
