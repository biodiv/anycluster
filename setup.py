from setuptools import setup, find_packages


install_requires = [
    'django',
]

setup(
    name="django-anycluster",
    version='0.1',
    description='anycluster provides Server-Side clustering of map markers for Geodjango',
    license='The MIT License',
    platforms=['OS Independent'],
    keywords='django, cluster, k-means, grid',
    author='Thomas Uher',
    author_email='tom@sisol-systems.de',
    url='https://github.com/biodiv/anycluster',
    packages=find_packages(),
    include_package_data=True,
    install_requires=install_requires,
)
