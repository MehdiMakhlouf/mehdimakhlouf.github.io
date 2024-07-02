import { Pipe, PipeTransform } from '@angular/core';

/**
 * This pipe can be used to wrap component function in template and so avoiding detection issues
 * Based on this article
 * @link https://medium.com/ngconf/boost-your-apps-performance-by-wrapping-your-functions-inside-a-pipe-7e889a901d1d
 */
@Pipe({
  name: 'wrapFn',
  standalone: true,
})
export class WrapFnPipe implements PipeTransform {
  transform<ARG, R>(func: (arg: ARG) => R, args: ARG): R;
  transform<ARG1, ARG2, R>(func: (arg1: ARG1, arg2: ARG2) => R, arg1: ARG1, arg2: ARG2): R;
  transform<ARG1, ARG2, R>(
    func: (arg1: ARG1, arg2: ARG2, ...arg: unknown[]) => R,
    arg1: ARG1,
    arg2: ARG2,
    ...arg: unknown[]
  ): R;

  transform<R>(func: (...arg: unknown[]) => R, ...args: unknown[]): R {
    return func(...args);
  }
}
