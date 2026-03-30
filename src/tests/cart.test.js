const { Builder, By, until } = require('selenium-webdriver');

(async function runTests() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        console.log("Iniciando bateria de pruebas (modo presentacion)...");

        // abrimos la url
        await driver.get('http://127.0.0.1:5500/src/');
        
        // pausa inicial para ver la pagina limpia
        await driver.sleep(2000); 

        await driver.wait(until.elementLocated(By.className('btn-add')), 2000);

        // capturamos los botones y hacemos clic en el primero
        let addButtons = await driver.findElements(By.className('btn-add'));
        console.log("Añadiendo el primer producto...");
        await addButtons[0].click(); 
        
        // pausa para que se vea que el contador del header subio
        await driver.sleep(2000);

        let cartCount = await driver.findElement(By.id('cart-count')).getText();
        if (cartCount === '1') {
            console.log("Test 1 OK: El DOM se actualiza correctamente.");
        } else {
            console.log("Test 1 FAIL: El evento de click no actualizo el contador.");
        }

        // hacemos scroll suave hacia abajo para que se vea la seccion del carrito
        console.log("Haciendo scroll para ver el contenido del carrito...");
        let cartSection = await driver.findElement(By.className('cart'));
        await driver.executeScript("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", cartSection);
        
        // pausa para ver el producto renderizado en el carrito
        await driver.sleep(2500);

        // recargamos
        console.log("Forzando recarga de la pagina...");
        await driver.navigate().refresh();
        
        // pausa despues de recargar para que se note el pantallazo
        await driver.sleep(2000);

        // volvemos a hacer scroll porque al recargar vuelve arriba
        cartSection = await driver.findElement(By.className('cart'));
        await driver.executeScript("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", cartSection);
        
        // ultima pausa para confirmar visualmente que el producto sigue ahi
        await driver.sleep(2500);

        let cartCountAfterRefresh = await driver.findElement(By.id('cart-count')).getText();
        if (cartCountAfterRefresh === '1') {
            console.log("Test 2 OK: El localStorage mantiene el estado tras la recarga.");
        } else {
            console.log("Test 2 FAIL: Los datos no persisten.");
        }

    } catch (error) {
        console.error("Fallo critico en la prueba:", error);
    } finally {
        console.log("Cerrando navegador en 3 segundos...");
        await driver.sleep(3000);
        await driver.quit();
    }
})();