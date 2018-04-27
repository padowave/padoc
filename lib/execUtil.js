const { 
  pluginPadocSupportPresetLocs,
  pluginPadocSupportPluginLocs
} = require('./cliUtil')

module.exports.esExecute = function({ input, module }){
  return new Promise((resolve,reject)=>{
    //ready config
    let babelCommands = []
    
    //presets
    babelCommands.push('--presets')
    babelCommands.push(pluginPadocSupportPresetLocs().join(','))
    
    //plugins
    babelCommands.push('--plugins')
    babelCommands.push(pluginPadocSupportPluginLocs().join(','))
    
    //input
    babelCommands.push('--')
    babelCommands.push(input)
    
    const spawn = require('child_process').spawn
    const babel = spawn('babel-node', babelCommands)
    
    babel.stdout.on('data',(data)=>console.log(data.toString()))
    babel.stderr.on('data',(data)=>console.log(data.toString()))
    babel.on('close', (code)=>{
      if(code === 0){
        resolve();
      } else {
        reject(1)
      }
    })
  })
}