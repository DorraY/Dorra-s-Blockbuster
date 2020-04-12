import { HighlightDirective } from './highlight.directive';

describe('HighlightDirective', () => {
  it('should create an instance', () => {
    const directive = new HighlightDirective({static:true},{static:true});
    expect(directive).toBeTruthy();
  });
});
