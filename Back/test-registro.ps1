$body = @{
    nombre = "Test"
    apellido = "Test"
    mail = "test@test.com"
    contraseña = "123456"
    localidad = "Buenos Aires"
    provincia = "Buenos Aires"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/registro-afectado" -Method POST -Body $body -ContentType "application/json"
    Write-Host "✅ Respuesta exitosa:" $response
} catch {
    Write-Host "❌ Error:" $_.Exception.Message
    Write-Host "Status Code:" $_.Exception.Response.StatusCode
}
