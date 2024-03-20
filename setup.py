from setuptools import setup, find_packages

with open("README.md", "r") as fh:
    long_description = fh.read()

install_requires = [
    'psycopg2',
    'djangorestframework',
    'jsonschema',
]

setup(
    name="anycluster",
    version='2.4.7',
    description='anycluster provides Server-Side clustering of map markers for Geodjango',
    long_description=long_description,
    long_description_content_type="text/markdown",
    license='The MIT License',
    platforms=['OS Independent'],
    keywords='django, cluster, kmeans, grid, server-side clustering',
    author='Thomas Uher',
    author_email='thomas.uher@sisol-systems.com',
    url='https://github.com/biodiv/anycluster',
    packages=find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires='>=3.6',
    include_package_data=True,
    install_requires=install_requires,
)
