function ValidateCPF(sendedCpf) {
    Object.defineProperty(this, 'clearCpf', {
        get: function() {
            return sendedCpf.replace(/\D+/g, '')
        }
    })
}

ValidateCPF.prototype.valida = function() {
    if (typeof this.clearCpf === 'undefined') return false
    if(this.clearCpf.length !== 11) return false
    if (this.isSequence() === true) return false

    const parcialCpf = this.clearCpf.slice(0, -2)
    const firstDigit = this.createDigit(parcialCpf)
    const secondDigit = this.createDigit(parcialCpf + firstDigit)

    const newCpf = parcialCpf + firstDigit + secondDigit
    
    return newCpf === this.clearCpf
}

ValidateCPF.prototype.createDigit = function(parcialCpf) {
    const cpfArray = Array.from(parcialCpf)
    let regressive = cpfArray.length + 1
    const total = cpfArray.reduce((ac, val) => {
        ac += (regressive * Number(val))
        regressive--;
        return ac
    }, 0)

    const digit = 11 - (total % 11)
    return digit > 9 ? "0" : String(digit)
}

ValidateCPF.prototype.isSequence = function() {
    return this.clearCpf[0].repeat(this.clearCpf.length) === this.clearCpf
}


const cpf = new ValidateCPF('070.987.720-03')
console.log(cpf.valida())

cpf.valida()