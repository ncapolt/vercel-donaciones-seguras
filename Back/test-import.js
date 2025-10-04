// Test de importación
console.log('🔍 Probando importaciones...');

try {
    console.log('📦 Importando afectadoRouter...');
    const afectadoRouter = await import('./routes/afectado.router.js');
    console.log('✅ afectadoRouter importado:', afectadoRouter.default);
    
    console.log('📦 Importando afectadoController...');
    const afectadoController = await import('./controllers/afectado.controller.js');
    console.log('✅ afectadoController importado:', afectadoController.registrarAfectado);
    
} catch (error) {
    console.error('❌ Error en importación:', error.message);
    console.error('❌ Stack:', error.stack);
}
