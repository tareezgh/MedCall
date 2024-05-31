import { render } from 'preact'
import { App } from './app.tsx'
import './index.css'
import "./I18n.ts"; 

render(<App />, document.getElementById('app')!)
