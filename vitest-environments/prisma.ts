import type { Environment } from 'vitest'

export default <Environment>{
  name: 'custom',
  transformMode: 'ssr',
  setup() {
    console.log('setup');
    
    return {
      teardown() {
        console.log('teardown');
      }
    }
  }
}