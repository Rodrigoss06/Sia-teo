#include <iostream>
using namespace std;

class Producto {
private:
    string nombre;
    double precio;
    string codigo;
public:
    Producto(string nombre, double precio, string codigo)
        : nombre(nombre), precio(precio), codigo(codigo) {}

    virtual void mostrarDetalles() = 0; // Método virtual puro

    string getNombre() const { return nombre; }
    double getPrecio() const { return precio; }
    string getCodigo() const { return codigo; }

    virtual ~Producto() {}
};

class Libros : public Producto {
private:
    string autor;
    int numPaginas;
public:
    Libros(string nombre, double precio, string codigo, string autor, int numPaginas)
        : Producto(nombre, precio, codigo), autor(autor), numPaginas(numPaginas) {}

    void mostrarDetalles() override {
        cout << "Libro: " << getNombre() << ", Precio: $" << getPrecio() << ", Codigo: " << getCodigo()
             << ", Autor: " << autor << ", Numero de Paginas: " << numPaginas << endl;
    }

    ~Libros() {}
};

class Electronicos : public Producto {
private:
    string marca;
    int garantia; // Duración de la garantía en meses
public:
    Electronicos(string nombre, double precio, string codigo, string marca, int garantia)
        : Producto(nombre, precio, codigo), marca(marca), garantia(garantia) {}

    void mostrarDetalles() override {
        cout << "Electronico: " << getNombre() << ", Precio: $" << getPrecio() << ", Codigo: " << getCodigo()
             << ", Marca: " << marca << ", Garantia: " << garantia << " meses" << endl;
    }

    ~Electronicos() {}
};

class Ropa : public Producto {
private:
    string talla;
    string color;
public:
    Ropa(string nombre, double precio, string codigo, string talla, string color)
        : Producto(nombre, precio, codigo), talla(talla), color(color) {}

    void mostrarDetalles() override {
        cout << "Ropa: " << getNombre() << ", Precio: $" << getPrecio() << ", Codigo: " << getCodigo()
             << ", Talla: " << talla << ", Color: " << color << endl;
    }

    ~Ropa() {}
};

int main() {
    Producto* productos[3];

    productos[0] = new Libros("El Quijote", 15.99, "L001", "Miguel de Cervantes", 1023);
    productos[1] = new Electronicos("iPhone", 999.99, "E001", "Apple", 24);
    productos[2] = new Ropa("Camiseta", 19.99, "R001", "M", "Rojo");

    for (int i = 0; i < 3; ++i) {
        productos[i]->mostrarDetalles();
    }

    for (int i = 0; i < 3; ++i) {
        delete productos[i];
    }

    return 0;
}
