/* eslint-disable @typescript-eslint/no-explicit-any */
import { action } from 'mobx';
import { NonCancelableEventHandler } from '@awsui/components-react/internal/events';
import { TypeTreeNode } from '@/types';

export interface UseStateInputProps<D, T, V = T> {
  node: TypeTreeNode;
  state: any;
  mapStateToValue?: (stateValue: T) => V;
  mapDetailToValue: (detail: D) => T;
}

function defaultStateToValue<T>(stateValue: any) {
  return stateValue as T;
}

/**
 * Use input for MobX state. This hook returns the value of the node in the state and a change handler that sets the
 * value of the node in the state.
 *
 * The value of the node in the state can be mapped to another type using the `mapStateToValue` prop. The detail of the
 * change handler has to be mapped to another type using the `mapDetailToValue` prop.
 */
export function useStateInput<D, T, V = T>({
  node,
  state,
  mapStateToValue = defaultStateToValue,
  mapDetailToValue,
}: UseStateInputProps<D, T, V>): { value: V; onChange: NonCancelableEventHandler<D> } {
  return {
    value: mapStateToValue(node.get(state) ?? node.metadata.defaultValue),
    onChange: action(event => node.set(state, mapDetailToValue(event.detail))),
  };
}
