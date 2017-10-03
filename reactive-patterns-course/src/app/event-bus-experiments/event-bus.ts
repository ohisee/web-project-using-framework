import * as _ from 'lodash';

export const LESSONS_LIST_AVAILABLE = 'NEW_LIST_AVAILABLE';
export const ADD_NEW_LESSON = 'ADD_NEW_LESSON';

/**
 * This is one Observer pattern implementation, not scalable
 * @export
 * @interface Observer
 */
export interface Observer {
  notify(data: any);
}

/**
 * @interface Subject
 */
interface Subject {
  registerObserver(eventType: string, observer: Observer);
  unregisterObserver(eventType: string, observer: Observer);
  notifyObserver(eventType: string, data: any);
}

/**
 * @class EventBus
 * @implements {Subject}
 */
class EventBus implements Subject {

  // private observers: Observer[] = [];
  private observers: {[key: string]: Observer[]} = {};

  /**
   * @param {string} eventType
   * @param {Observer} observer
   * @memberof EventBus
   */
  registerObserver(eventType: string, observer: Observer) {
    // this.observers.push(observer);
    this.observersPerEventType(eventType).push(observer);
  }

  /**
   * @param {string} eventType
   * @param {Observer} observer
   * @memberof EventBus
   */
  unregisterObserver(eventType: string, observer: Observer) {
    _.remove(this.observersPerEventType(eventType), (element) => {
      return (element === observer);
    });
  }

  /**
   * @param {string} eventType
   * @param {*} data
   * @memberof EventBus
   */
  notifyObserver(eventType: string, data: any) {
    this.observersPerEventType(eventType).forEach((observer) => {
      observer.notify(data);
    });
  }

  /**
   * @private
   * @param {string} eventType
   * @returns {Observer[]}
   * @memberof EventBus
   */
  private observersPerEventType(eventType: string): Observer[] {
    const observersPerType = this.observers[eventType];
    if (observersPerType == null) {
      this.observers[eventType] = [];
    }
    return this.observers[eventType];
  }

}

export const globalEventBus = new EventBus();
